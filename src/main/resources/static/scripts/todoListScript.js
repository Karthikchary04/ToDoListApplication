    function fetchTasks() {
        fetch('/api/tasks')
            .then(response => response.json())
            .then(data => {
                const tasksDiv = document.getElementById('tasks');
                const currentDate = new Date();

                const taskItems = data.map(task => {
                    const dueDate = new Date(task.dueDate);
                    const isOverdue = dueDate < currentDate;

                    const redXIcon = isOverdue
                        ? `<i class="fas fa-times" style="color: red;"></i>`
                        : '';
                    return `<li>
                        <input type="checkbox" name="taskCheckbox" value="${task.id}" style="display: none;"/>
                        ${task.id} - ${task.title} - ${task.description} - ${task.dueDate} - ${task.category.categoryname}
                        ${redXIcon}
                    </li>`;
                }).join('');
                tasksDiv.innerHTML = `<ul>${taskItems}</ul>`;
            })
            .catch(error => console.error('Error fetching tasks:', error));
    }

    document.getElementById('taskForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const dueDate = document.getElementById('dueDate').value;
        const category = document.getElementById("category").value;

        fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, completed: false, dueDate, category : { categoryname : category }})
        })
        .then(response =>  {
            if(!response.ok) {
                const taskCreatedMessage = document.getElementById('taskNotCreatedMessage');
                taskCreatedMessage.innerHTML = '<p style="color: green;"> Error While Creating Task, Try Again!</p>';
            }
        })
        .then(() => {
            console.log('Task created:', data);
            const taskCreatedMessage = document.getElementById('taskCreatedMessage');
            taskCreatedMessage.innerHTML = '<p style="color: green;"> Task Created </p>';
            //fetchTasks();
        })
        .catch(error => console.error('Error creating task:', error));
    });

    function fetchTaskById() {
      const taskId = document.getElementById('taskId').value;
      fetch(`/api/tasks/${taskId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
      })
      .then(response => {
          if (!response.ok) throw new Error('Task not found');
          return response.json();
      })
      .then(data => {
          const fetchedTask = document.getElementById('fetchedTask');
          fetchedTask.innerHTML = `ID: ${data.id} - Title: ${data.title} - Description: ${data.description} - Due Date: ${data.dueDate}`;
      })
      .catch(error => {
          console.error('Error fetching task:', error);
      });
    }

    function showCheckboxesOnSelect() {
        document.querySelectorAll('input[name="taskCheckbox"]').forEach(cb => {
            cb.style.display = cb.style.display === 'none' ? 'inline-block' : 'none';
        });
    }

    function deleteTask() {
          const id = document.getElementById('taskIdToDelete').value;
          fetch(`/api/tasks/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          })
        .then(response => {
          if (!response.ok) throw new Error('Task not found');
          return response.text(); // No JSON body needed for DELETE success
        })
        .then(() => {
          document.getElementById('deleteMessage').innerHTML = `<p style="color: green;">Deleted!</p>`;
        })
        .catch(error => {
          console.error('Error deleting task:', error);
          document.getElementById('deleteMessage').innerHTML = `<p style="color: red;">${error.message}</p>`;
        });
    }

    function deleteSelectedTasks() {
        const tasksToDelete = document.querySelectorAll('input[name="taskCheckbox"]:checked');
        const idsToDelete = Array.from(tasksToDelete).map(tasks => tasks.value)
        fetch(`/api/tasks/delete-multiple-tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(idsToDelete)
        })
        .then(response => {
            if(!response.ok) throw new Error('Tasks Not Found');
            return response.text();
        })
        .then(() => {
            document.getElementById('deletedSelectedTasksMessage').innerHTML = `<p style="color: green;">Deleted!</p>`;
            fetchTasks();
        })
        .catch(error => {
          console.error('Error deleting task:', error);
          document.getElementById('deleteMessage').innerHTML = `<p style="color: red;">${error.message}</p>`;
        });
    }

    window.addEventListener('DOMContentLoaded', async () => {
        const response = await fetch(`/api/tasks/getCategories`, {
            method:'GET',
            headers: {
              'Content-Type': 'application/json'
            }
        });
        const categories = await response.json();
        console.log('Script loaded');
        displayCategories(categories);
        displayCategoriesOnTaskForm(categories);
    });

    function displayCategories(categories) {
        const categoriesDropdown = document.getElementById('categoriesDropdown');
        categoriesDropdown.innerHTML = `
        <button onClick="showCategories()">Categories</button>
        <div id="dropdownContent" class="dropdown-content">
        ${categories.map(category => `
                <label>
                    <input type="checkbox" id="${category.id}"/>
                    ${category.categoryname}
                </label></br>`).join('')
        }
        <button id="getTasksByCategory">Get</button>
        </div>`;
    }

    function showCategories() {
      document.getElementById('dropdownContent').classList.toggle('show');
    }

    function displayCategoriesOnTaskForm(categories) {
        console.log('Script loaded');
        const select = document.getElementById('selectCategory');
        categories.forEach( category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.categoryname;
            select.appendChild(option);
        });
    }

    function addCategory() {
        const categoryName = document.getElementById('categoryName').value;
        fetch(`/api/tasks/addCategory/${categoryName}`, {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json"
            }
        })
        .then(response => {
            if(!response.ok) {
                const categoryNotCreatedMessage = document.getElementById('categoryNotCreatedMessage');
                categoryNotCreatedMessage.innerHTML = `<p> Category not Created, Try Again! </p>`;
            }
            return response.json();
        })
        .then(data => {
            const categoryCreatedMessage = document.getElementById('categoryCreatedMessage')
            console.log('category Data:', data);
            categoryCreatedMessage.innerHTML = `<p> Category Created: ${data.categoryname} </p>`;
            location.reload();
        })
        .catch(error => {
          console.error('Error saving category:', error);
          document.getElementById('categoryNotCreatedMessage').innerHTML = `<p style="color: red;">${error.message}</p>`;
        });
    }