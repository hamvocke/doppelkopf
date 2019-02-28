from dataclasses import dataclass
from enum import Enum

feature_toggles = {}


def add(feature_toggle):
    if feature_toggle.name in feature_toggles:
        raise RuntimeError(
            'feature with name "{}" already registered'.format(feature_toggle.name)
        )
    feature_toggles.update({feature_toggle.name: feature_toggle})


def find(name=None):
    return feature_toggles.get(name)


@dataclass
class FeatureToggle(object):
    """A FeatureToggle can be used to activate or deactivate functionality at
    runtime. It's status (enabled/disabled) can be queried to change the
    runtime behaviour of the application.

    Example:

        do_a = FeatureToggle("some feature", enabled=True)
        if do_a:
            print("I'm doing a")
        else:
            print("I'm doing b")
    """

    name: str
    enabled: bool = False

    def toggle(self):
        self.enabled = not self.enabled


# featureManager = FeatureManager()
