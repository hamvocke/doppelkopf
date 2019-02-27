from backend import toggles


sample_toggle = toggles.Feature("sample feature", enabled=True)


def test_building_feature():
    assert sample_toggle.enabled is True


def test_switch_feature_state():
    sample_toggle.toggle()
    assert sample_toggle.enabled is False

    sample_toggle.toggle()
    assert sample_toggle.enabled is True
