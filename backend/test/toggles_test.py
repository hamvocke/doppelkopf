from backend import toggles
import pytest

sample_feature = toggles.Feature("sample feature", enabled=True)


def test_building_feature():
    assert sample_feature.enabled is True


def test_switch_feature_state():
    sample_feature.toggle()
    assert sample_feature.enabled is False

    sample_feature.toggle()
    assert sample_feature.enabled is True


def test_find_toggle():
    toggles.features.add(sample_feature)

    received_feature = toggles.features.find(name="sample feature")

    assert received_feature == sample_feature


def test_should_throw_error_if_feature_already_exists():
    another_feature = toggles.Feature("sample feature", enabled=False)

    with pytest.raises(RuntimeError) as excinfo:
        toggles.features.add(sample_feature)
        toggles.features.add(another_feature)

    assert 'feature with name "sample feature" already registered' in str(excinfo.value)
