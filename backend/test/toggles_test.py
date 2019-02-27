from backend import toggles


sample_toggle = toggles.FeatureToggle("sample toggle", enabled=True)


def test_toggle():
    assert sample_toggle.enabled is True


def test_switch_toggle_state():
    sample_toggle.toggle()
    assert sample_toggle.enabled is False

    sample_toggle.toggle()
    assert sample_toggle.enabled is True
