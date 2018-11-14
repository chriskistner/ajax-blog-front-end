var blogs;
var apiURL = "https://chrisk-ajax-blog.herokuapp.com/";
var sortBy = require('sort-by');
const axios = require('axios');
const create = require('./templates');

//GENERATE ALL BLOGS FOR PAGE, RAN ON INTIAL LOAD
function getPosts() { axios.get(apiURL) 
    .then(function (result) {
        let blogs = result.data.data;
        let sortedBlogs = blogs.sort(sortBy('-date'))
        
        populateBlog(sortedBlogs);
    })
};
getPosts();

//LOCATE ONE SPECIFC BLOG BASED ON ID AND RENDER IT
let searchForBlog = document.querySelector('#findPost');

function getPost(blog) {
    axios.get(apiURL + `/${blog}`)
        .then(function (result) {
            let blog = result.data;
            populateBlog([blog]);
        })
}

searchForBlog.addEventListener('submit', function(event){
    event.preventDefault();
    let targetBlog = event.target.searchField.value;
    getPost(targetBlog);
    event.target.searchField.value = '';
})

//BUTTON THAT GETS ALL BLOGS IF YOU ARE VIEWING JUST ONE
let getAllPosts = document.querySelector('#all-posts');
getAllPosts.addEventListener('click', function(){
    getPosts();
});

//PULLS ALL BLOGS FROM THE SERVER AND GENERATES ALL THE BLOG COLUMNS TO BE RENDERED
function populateBlog(arr){

    const appliedTemplates = arr.map(blog => create.blogTemplate(blog.id, blog.title, blog.date, blog.content)).join('\n')
    document.querySelector(".blog-body").innerHTML = appliedTemplates
    
    for (const blog of arr){
        let deleteBlogButton = document.querySelector(`#deletePost[data-id="${blog.id}"]`);
        let updateBlogButton = document.querySelector(`#editPost[data-id="${blog.id}"]`);
        deleteBlogButton.addEventListener('click', function(){
            axios.delete(apiURL+`/${blog.id}`)
            .then(function(){
                console.log("Post Deleted")
                getPosts();
            })
        })

        updateBlogButton.addEventListener('click', function() {
            openUpdateBlogWindow(blog);
        })
    }  
};

// OPENS THE FORM WINDOW TO CREATE A NEW BLOG
let postNewBlog= document.querySelector("#new-post");
let menuArea = document.querySelector('#menu-area');

function openNewBlogWindow () {
    menuArea.innerHTML = create.newBlogTemplate();
    let closeButton = document.querySelector('#stop-post');
    closeButton.addEventListener('click', function(){
        menuArea.classList.add('hide-menu');
    })
};

//OPENS THE UPDATE FORM WINDOW TO UPDATE AN EXISTING BLOG
function openUpdateBlogWindow (blog) {
    menuArea.innerHTML = create.updateBlogTemplate(blog.id, blog.title, blog.content);
    menuArea.classList.remove('hide-menu');

    let closeButton = document.querySelector('#stop-post');
    let submitUpdateBlog = document.querySelector('#submitUpdatedPost');
    let updatedTitle = document.querySelector('#updateTitle')
    let updatedContent = document.querySelector(`#updatedContent`);

    closeButton.addEventListener('click', function(){
        menuArea.classList.add('hide-menu');
    })
    submitUpdateBlog.addEventListener('submit', function(event){
        event.preventDefault();
        const updatePost = axios.put(apiURL+`/${blog.id}`, {
            title : updatedTitle.value,
            content: updatedContent.value
        })
        .then(function(){
            console.log('Updated');
            getPosts();
            menuArea.classList.add('hide-menu');
        })
    })
};

//POSTS A NEW BLOG TO THE SERVER AND RE-RENDERS THE BLOG PAGE
postNewBlog.addEventListener("click",function(){
    openNewBlogWindow();
    menuArea.classList.remove('hide-menu');
    let newPostName = document.querySelector('.input-fieldB');
    let newPostContent = document.querySelector('.input-fieldC');
    let submitPost = document.querySelector('#submitPost');
    submitPost.addEventListener("submit",function(event){
        event.preventDefault();
        const addNewPost = axios.post(apiURL, {
            title : newPostName.value,
            content: newPostContent.value
        })
        .then(function(){
            console.log("Success")
            getPosts();
            menuArea.classList.add('hide-menu');
        });
    });
});

