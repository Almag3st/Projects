from PySide6.QtCore import QModelIndex, QStringListModel, Qt
from PySide6.QtWidgets import QWidget
from widget_ui import Ui_Widget


class Widget(QWidget, Ui_Widget):
    def __init__(self):
        super().__init__()
        self.setupUi(self)
        self.setWindowTitle("QStringListModel - ListView")

        # Set up the model
        self.model = QStringListModel(self)
        list = ["Cow", "Rooster", "Hyena", "Lion", "Wild Dog"]
        self.model.setStringList(list)

        # Attach the model to the view
        self.listView.setModel(self.model)

        # Make signal slot connections
        self.show_data_button.clicked.connect(self.show_data_button_clicked)

    def show_data_button_clicked(self):
        # Read the data using QStringList API
        """
        list = self.model.stringList()
        for s in list:
            print(s)
        """

        # Read the data using QAb
        # stractItemModel API
        for i in range(self.model.rowCount(QModelIndex())):
            index = self.model.index(i, 0, QModelIndex())
            # data = index.data(Qt.DisplayRole)
            data = self.model.data(index, Qt.DisplayRole)
            print(data)
