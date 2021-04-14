// storage controller


// item controller
const ItemCtrl = (function () {
    // item constructor
    const Item = function (id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }
    // data structure / state
    const data = {
        items: [],
        currentItem: null,
        totalCalories: 0
    }
    return {
        logData: function () {
            return data
        },
        getItems: function () {
            return data.items;
        },
        addItem: function (name, calories) {
            let ID;
            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1
            } else {
                ID = 0;
            }

            calories = parseInt(calories);
            newItem = new Item(ID, name, calories);
            data.items.push(newItem);
            return newItem;
        }
    }

})()

// ui controller
const UICtrl = (function () {
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories'
    }
    return {
        populateItemList: function (items) {
            let html = ''
            items.forEach(item => {
                html += `
    <li class="collection-item" id="item-${item.id}">
          <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>
        </li>
    `
            });
            //insert
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getItemInput: function () {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem: function (item) {
            document.querySelector(UISelectors.itemList).style.display = 'block';
            const li = document.createElement('li');
            li.className = 'collection-item'
            li.id = `item-${item.id}`;
            li.innerHTML = ` <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                            <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                            </a>`
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)

        },
        clearInput: function () {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        hideList: function () {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        getSelectors: function () {
            return UISelectors
        }
    }
})()

//app controller
const App = (function (ItemCtrl, UICtrl) {
    //load events
    const loadEventListeners = function () {
        const UISelectors = UICtrl.getSelectors();

        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit)

    }
    const itemAddSubmit = function (e) {
        e.preventDefault();
        const input = UICtrl.getItemInput()

        if (input.name !== '' && input.calories !== '') {
            const newItem = ItemCtrl.addItem(input.name, input.calories);
            UICtrl.addListItem(newItem);
            UICtrl.clearInput()
        }
    }
    return {
        init: function () {
            console.log('Initializing App')
            const items = ItemCtrl.getItems();
            if (items.length === 0) {
                UICtrl.hideList();
            } else {
                UICtrl.populateItemList(items)
            }




            loadEventListeners();
        }
    }

})(ItemCtrl, UICtrl)


App.init();