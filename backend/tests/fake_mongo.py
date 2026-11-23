"""
A small in-memory stand-in for the parts of Motor these services use, so the
outreach tests exercise real query and update logic without a database.
"""
import copy
from types import SimpleNamespace
from typing import Any, Dict, List, Optional


def _matches(document: dict, query: dict) -> bool:
    for key, condition in query.items():
        value = document.get(key)
        if isinstance(condition, dict) and any(k.startswith("$") for k in condition):
            for operator, operand in condition.items():
                if operator == "$in":
                    if value not in operand:
                        return False
                elif operator == "$nin":
                    if value in operand:
                        return False
                elif operator == "$ne":
                    if value == operand:
                        return False
                elif operator in ("$gte", "$gt", "$lte", "$lt"):
                    if value is None:
                        return False
                    if operator == "$gte" and not value >= operand:
                        return False
                    if operator == "$gt" and not value > operand:
                        return False
                    if operator == "$lte" and not value <= operand:
                        return False
                    if operator == "$lt" and not value < operand:
                        return False
                else:
                    raise NotImplementedError(operator)
        elif value != condition:
            return False
    return True


def _project(document: dict, projection: Optional[dict]) -> dict:
    result = copy.deepcopy(document)
    if not projection:
        return result
    included = [k for k, v in projection.items() if v and k != "_id"]
    if included:
        result = {k: result[k] for k in included if k in result}
        if projection.get("_id", 1) and "_id" in document:
            result["_id"] = document["_id"]
    elif projection.get("_id") == 0:
        result.pop("_id", None)
    return result


class FakeCursor:
    def __init__(self, documents: List[dict]):
        self._documents = documents

    def sort(self, key, direction: int = 1):
        specs = key if isinstance(key, list) else [(key, direction)]
        for field, order in reversed(specs):
            self._documents.sort(
                key=lambda d: (d.get(field) is None, d.get(field) or 0 if not isinstance(
                    d.get(field), str) else d.get(field)),
                reverse=order < 0,
            )
        return self

    def skip(self, count: int):
        self._documents = self._documents[count:]
        return self

    def limit(self, count: int):
        self._documents = self._documents[:count]
        return self

    async def to_list(self, length: Optional[int] = None):
        return self._documents if length is None else self._documents[:length]


class FakeCollection:
    def __init__(self):
        self.documents: List[dict] = []
        self._next_id = 0

    def _find(self, query: dict) -> List[dict]:
        return [d for d in self.documents if _matches(d, query or {})]

    async def find_one(self, query: Optional[dict] = None, projection: Optional[dict] = None):
        found = self._find(query or {})
        return _project(found[0], projection) if found else None

    def find(self, query: Optional[dict] = None, projection: Optional[dict] = None):
        return FakeCursor([_project(d, projection) for d in self._find(query or {})])

    async def insert_one(self, document: dict):
        stored = copy.deepcopy(document)
        if "_id" not in stored:
            self._next_id += 1
            stored["_id"] = f"oid{self._next_id}"
        self.documents.append(stored)
        return SimpleNamespace(inserted_id=stored["_id"])

    def _apply(self, document: dict, update: dict, inserting: bool = False) -> None:
        for field, value in update.get("$set", {}).items():
            document[field] = copy.deepcopy(value)
        for field, value in update.get("$inc", {}).items():
            document[field] = document.get(field, 0) + value
        if inserting:
            for field, value in update.get("$setOnInsert", {}).items():
                document[field] = copy.deepcopy(value)

    async def update_one(self, query: dict, update: dict, upsert: bool = False):
        found = self._find(query)
        if found:
            self._apply(found[0], update)
            return SimpleNamespace(matched_count=1, modified_count=1, upserted_id=None)
        if upsert:
            document: Dict[str, Any] = {k: v for k, v in query.items() if not isinstance(v, dict)}
            self._apply(document, update, inserting=True)
            await self.insert_one(document)
            return SimpleNamespace(matched_count=0, modified_count=0, upserted_id="new")
        return SimpleNamespace(matched_count=0, modified_count=0, upserted_id=None)

    async def update_many(self, query: dict, update: dict):
        found = self._find(query)
        for document in found:
            self._apply(document, update)
        return SimpleNamespace(matched_count=len(found), modified_count=len(found))

    async def delete_one(self, query: dict):
        found = self._find(query)
        if found:
            self.documents.remove(found[0])
        return SimpleNamespace(deleted_count=1 if found else 0)

    async def count_documents(self, query: dict):
        return len(self._find(query))


class FakeDatabase:
    def __init__(self):
        self._collections: Dict[str, FakeCollection] = {}

    def __getattr__(self, name: str) -> FakeCollection:
        if name.startswith("_"):
            raise AttributeError(name)
        return self._collections.setdefault(name, FakeCollection())
