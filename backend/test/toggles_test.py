from backend import toggles


sample_toggle = toggles.FeatureToggle("sample feature", enabled=True)


def test_build_feature():
    assert sample_toggle.enabled is True
    assert sample_toggle.name == "sample feature"


def test_switch_feature_state():
    sample_toggle.toggle()
    assert sample_toggle.enabled is False

    sample_toggle.toggle()
    assert sample_toggle.enabled is True


def test_add_toggles():
    toggles.feature_toggles = {}

    toggles.add(sample_toggle)

    assert toggles.feature_toggles == {"sample feature": sample_toggle}


def test_find_toggle():
    toggles.feature_toggles = {}
    toggles.add(sample_toggle)

    found_toggle = toggles.find("sample feature")

    assert found_toggle == sample_toggle


def test_return_None_when_toggle_not_found():
    found_toggle = toggles.find("another toggle")

    assert found_toggle is None
