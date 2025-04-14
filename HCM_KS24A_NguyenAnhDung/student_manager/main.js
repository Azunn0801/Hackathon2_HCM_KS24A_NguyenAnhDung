let studentList = []

console.log(document.getElementById('name'))

const dataEl = document.querySelector('tbody')
const findStatEl = document.getElementById('findErr')
const formEditEL = document.getElementById('form-control-edit')

function validateForm(event) {
    event.preventDefault()

    const checkForm = [
        { input: document.getElementById('name'), error: document.getElementById('nameErr') },
        { input: document.getElementById('id'), error: document.getElementById('idErr') },
        { input: document.getElementById('email'), error: document.getElementById('emailErr') },
        { input: document.getElementById('class'), error: document.getElementById('classErr') }
    ]

    checkForm.forEach(({ input, error }) => {
        if (input.value.trim() === "") {
            document.getElementById('idErr').innerText = "Mã số sinh viên không được để trống"
            error.style.display = "block"
        }
        else {
            error.style.display = "none"
        }
    })

    const idInput = document.getElementById('id').value.trim()
    const isDuplicate = studentList.some(student => student.id === idInput)

    if (isDuplicate) {
        document.getElementById('idErr').style.display = "block"
        document.getElementById('idErr').innerText = "Mã số sinh viên không được trùng nhau"
    }

    const confirmForm = checkForm.every(({ error }) => error.style.display === "none")

    if (confirmForm) {
        addStudent(checkForm)
    }
}

function addStudent(checkForm) {
    newStudent = {}

    checkForm.forEach(({ input }) => {
        newStudent[input.id] = input.value.trim()
    })

    studentList.push(newStudent)
    console.log(studentList)
    renderData()
}

function renderData() {
    let dataHTML = ``

    for (let i = 0; i < studentList.length; i++) {
        dataHTML += `
        <tr>
            <td>${i + 1}</td>
            <td>${studentList[i].name}</td>
            <td>${studentList[i].id}</td>
            <td>${studentList[i].email}</td>
            <td>${studentList[i].class}</td>
            <td>
                <button type="button" class="btn btn-warning" data-bs-toggle="modal"
                    data-bs-target="#editModal" onclick="loadEditData(${i})">
                    Sửa
                </button>
                <button type="button" class="btn btn-danger" onclick="deleteStudent(${i})">
                    Xoá
                </button>
            </td>
        </tr>
        `
    }

    dataEl.innerHTML = dataHTML
}

function findStudent(event) {
    if (event.key === 'Enter') {
        event.preventDefault()
        const searchValue = event.target.value.trim().toLowerCase()
        const filteredStudents = studentList.filter(student =>
            student.name.toLowerCase().includes(searchValue)
        )

        renderFilteredData(filteredStudents)

        if (filteredStudents.length === 0) {
            findStatEl.style.display = "block"
        } else {
            findStatEl.style.display = "none"
        }
    }
}

function renderFilteredData(filteredList) {
    let dataHTML = ``

    for (let i = 0; i < filteredList.length; i++) {
        dataHTML += `
        <tr>
            <td>${i + 1}</td>
            <td>${filteredList[i].name}</td>
            <td>${filteredList[i].id}</td>
            <td>${filteredList[i].email}</td>
            <td>${filteredList[i].class}</td>
            <td>
                <button type="button" class="btn btn-warning" data-bs-toggle="modal"
                    data-bs-target="#editModal" onclick="loadEditData(${i})">
                    Sửa
                </button>
                <button type="button" class="btn btn-danger" onclick="deleteStudent(${i})">
                    Xoá
                </button>
            </td>
        </tr>
        `
    }

    dataEl.innerHTML = dataHTML
}


function deleteStudent(index) {
    if (window.confirm("Bạn có chắc chắn muốn xóa không?")) {
        studentList.splice(index, 1)
        renderData()
        alert("Xoá thành công")
    }
}

function loadEditData(index) {
    document.getElementById('edit-index').value = index
    document.getElementById('edit-name').value = studentList[index].name
    document.getElementById('edit-id').value = studentList[index].id
    document.getElementById('edit-email').value = studentList[index].email
    document.getElementById('edit-class').value = studentList[index].class
}


function updateStudent(event) {
    event.preventDefault()

    const index = document.getElementById('edit-index').value
    const updatedStudent = {
        name: document.getElementById('edit-name').value.trim(),
        id: document.getElementById('edit-id').value.trim(),
        email: document.getElementById('edit-email').value.trim(),
        class: document.getElementById('edit-class').value.trim()
    }

    studentList[index] = updatedStudent
    renderData()
    alert("Cập nhật thành công")
}

