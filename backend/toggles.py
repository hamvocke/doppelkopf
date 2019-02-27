from dataclasses import dataclass


class Features(object):
    """docstring for Features."""

    def __init__(self):
        super(Features, self).__init__()
        self.feature_list = {}

    def add(self, feature):
        self.feature_list.update({feature.name: feature})

    def find(self, name=None):
        return self.feature_list.get(name)


@dataclass
class Feature(object):
    """A Feature can be used to activate or deactivate functionality at
    runtime. It's status (enabled/disabled) can be queried to change the
    runtime behaviour of the application.

    Example:

        do_a = Feature("do_a", enabled=True)
        if do_a:
            print("I'm doing a")
        else:
            print("I'm doing b")
    """

    name: str
    enabled: bool = False

    def toggle(self):
        self.enabled = not self.enabled


features = Features()
