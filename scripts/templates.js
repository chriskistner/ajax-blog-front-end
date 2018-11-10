
const blogTemplate = (id, title, date, content) => {
    return `
        <div class="row">
            <div class="column">
                <div class= "blog-header">
                    <h2>${title}</h2>
                    <p>Created/Last Updated: ${date}</p>
                </div>
            <hr />
                <div class = "blog-body">
                    <p>${content}</p>
                </div>
                <div>
                    <button id ="${id}-edit" type="button" class="btn btn-outline-danger">Update</button>
                    <button id ="${id}-delete" type="button" class="btn btn-outline-warning">Delete</button>
                </div>
            </div>
        </div>
      `
  }

  const newBlogTemplate = () => {
      return `
          <div class="form-group ">
              <form id="galvanizerole">
                <div class="row align-items-center justify-content-between">
                    <div class="col-10">
                        <h2>Post Information</h2>
                    </div>
                    <div class="col-2">
                        <button id = "stop-post" type="button" class="btn btn-outline-dark">X</button>
                    </div>
                  </div>
                  <div class="menuBar">
                      <label class="menuBar" for="blogID">Blog ID</label>
                  </div>
                  <input class="input-fieldA" type="text" id="blogID">
                  <div class="menuBar">
                      <label class="menuBar" for="blogTitle">Title</label>
                  </div>
                  <input class="input-fieldA" type="text" id="blogTitle">
                  <div class="menuBar">
                      <label class="menuBar" for="blogContent">Content</label>
                  </div>
                  <input class="input-fieldB" type="text" id="blogContent"><br>
                  <input type="submit" id="submission" value="SUBMIT">
              </form>
          </div>
      `
  }

  module.exports = { 
      blogTemplate,
      newBlogTemplate,
  }