from app.models.review_request import ReviewRequest, ReviewStatus, ReviewChannelType, FeedbackSubmission


def test_review_request_defaults():
    r = ReviewRequest(
        id="r1", customer_id="c1", appointment_id="a1",
        customer_name="Jane", customer_email="jane@x.com", customer_phone="3105551212",
        token="tok123",
    )
    assert r.status == ReviewStatus.pending
    assert r.channel == ReviewChannelType.email
    assert r.rating is None


def test_feedback_submission_validates_rating_range():
    import pytest
    with pytest.raises(Exception):
        FeedbackSubmission(rating=6)
    fs = FeedbackSubmission(rating=5)
    assert fs.rating == 5
