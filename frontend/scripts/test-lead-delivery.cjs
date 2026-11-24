const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const ts = require('typescript');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../src/utils/api.ts'), 'utf8').replaceAll('import.meta.env', '{}');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }}).outputText;
const lead = { name: 'Test', email: 'test@example.invalid', phone: '0000000000' };
async function scenario(name, db, email, expected) {
  const sandbox = { exports: {}, console: { warn() {} }, fetch: async url => {
    const value = url.includes('formsubmit.co') ? email : db;
    if (value instanceof Error) throw value;
    return { ok: value.ok, status: value.ok ? 200 : 500, json: async () => value.body };
  }};
  vm.runInNewContext(compiled, sandbox);
  const result = await sandbox.exports.submitFormWithBackend(lead);
  assert.equal(result.success, expected, name);
  console.log('PASS ' + name);
}
(async () => {
 await scenario('both services unavailable', new Error('offline'), new Error('offline'), false);
 await scenario('HTTP rejection is not success', {ok:false, body:{detail:'Unavailable'}}, {ok:false, body:{success:'true'}}, false);
 await scenario('email application rejection is not success', new Error('offline'), {ok:true, body:{success:'false'}}, false);
 await scenario('email string success fallback', new Error('offline'), {ok:true, body:{success:'true'}}, true);
 await scenario('email boolean success fallback', new Error('offline'), {ok:true, body:{success:true}}, true);
 await scenario('saved lead survives email failure', {ok:true, body:{id:'test-lead'}}, new Error('offline'), true);
})();
