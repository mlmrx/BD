import pytest
from ..main import calculate_dadscore

@pytest.fixture
def fixture_asset():
    return {"value": 187}


def test_dadscore_fixture(fixture_asset):
    assert calculate_dadscore(fixture_asset) == 87
