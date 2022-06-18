//used a JSON Server for my API, followed these instructions for my server https://github.com/typicode/json-server#getting-started

$(document).ready(() => {
    let catList = []; //blank array for all the cats

//Get - using our local URL
    $.get('http://localhost:3000/posts', (data) => {
        catList = data; //all this data we are getting back will be put into the placeholder 
    }).done(() => buildInfoList()); //async call so when it comes back it will run this done function

    //
    const buildInfoList = () => {
        $('#cat-content').empty(); //
        catList.forEach(cat => {
            $('#cat-content').append(
                `<div id="cat${cat.id}" class="info-box">
                id:${cat.id} ${cat.name} ${cat.age} </div>`
            )
            $(`#cat${cat.id}`).click(() => removeItem(cat.id))
        });

    };

    //Post - create the cat data
    $('#catForm').submit((event) => {
        event.preventDefault();
        const formData = {
            name: $('#name').val(), //show the name value
            age: $('#age').val()    //show the age  value
        };
        $.post('http://localhost:3000/posts', //make sure to post to the same endpoint
            {name: formData.name, age: formData.age}, //the object we are sending to the server
            (data) => {console.log(data)
        });

    });

    $('#catForm').trigger('reset'); //clear form for good user experience
    buildInfoList();

});

//Delete - delete some data
const removeItem = (id) => {
    $.ajax({
        url: `http://localhost:3000/posts/${id}`, //delete only that ID
        type: 'DELETE',
        success: function() { //on success re-render the list
            buildInfoList();
        }
    });
};

//Put - update any data already stored

$('#updateForm').submit((event) => {
    event.preventDefault();
    const formData = {
        id: $('#updateId').val(),
        name: $('#updateName').val(),
        age: $('#updateAge').val()
    };

    $.ajax({
        url: `http://localhost:3000/posts/${formData.id}`,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(formData)
    }).done(() => buildInfoList());

    $('#updateForm').trigger('reset'); //clear form for good user experience
})

