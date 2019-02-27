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

    def __init__(self, name, enabled):
        super(Feature, self).__init__()
        self.name = name
        self.enabled = enabled

    def toggle(self):
        self.enabled = not self.enabled
