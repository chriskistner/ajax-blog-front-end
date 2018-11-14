
const blogTemplate = (id, title, date, content) => {
    return `
        <div class="row blog-row">
            <div class="col-12 border border-dark rounded-top">
                <div class= "blog-header blog-box">
                    <h2 id = "blogTitle">${title}</h2>
                    <p style="margin-bottom: 0px;">Created/Last Updated: ${date}</p>
                    <p style="margin-bottom: 2px;" id="blogIDNum" data-id="${id}"><i>id: ${id}</i></p>
                </div>
            <hr style="margin-top: 2px;" />
                <div class = "blog-body blog-box">
                    <p>${content}</p>
                </div>
            <hr style="margin-bottom: 2px;" />
                <div class="blog-box">
                    <button id="editPost" data-id="${id}" type="button" class="btn btn-outline-danger">Update</button>
                    <button id="deletePost" data-id="${id}" type="button" class="btn btn-outline-warning">Delete</button>
                </div>
            </div>
        </div>
      `
  }

  const newBlogTemplate = () => {
      return `
          <div class="form-group">
              <form id="submitPost">
                <div class="row align-items-center justify-content-between">
                    <div class="col-10">
                        <h2>Post Information</h2>
                    </div>
                    <div class="col-2">
                        <button id = "stop-post" type="button" class="btn btn-outline-dark">X</button>
                    </div>
                  </div>
                  <div class="menuBar">
                      <label class="menuBar" for="blogTitle">Title</label>
                  </div>
                  <input class="input-fieldB" type="text" id="blogTitle">
                  <div class="menuBar">
                      <label class="menuBar" for="blogContent">Content</label>
                  </div>
                  <textarea class="input-fieldC" type="text" id="blogContent"></textarea><br>
                  <input type="submit" id="submission" value="SUBMIT">
              </form>
          </div>
      `
  }

  const updateBlogTemplate = (id, title, content) => {
    return `
        <div class="form-group ">
            <form id="submitUpdatedPost">
              <div class="row align-items-center justify-content-between">
                  <div class="col-10">
                      <h2>Post Information</h2>
                  </div>
                  <div class="col-2">
                      <button id = "stop-post" type="button" class="btn btn-outline-dark">X</button>
                  </div>
                </div>
                <div class="menuBar">
                <p  class="postID">${id}</p>
                    <label class="menuBar" for="blogTitle">Title</label>
                </div>
                <input class="input-fieldB" type="text" id="updateTitle" value="${title}">
                <div class="menuBar">
                    <label class="menuBar" for="blogContent">Content</label>
                </div>
                <textarea class="input-fieldC" type="text" id="updatedContent">${content}</textarea><br>
                <input type="submit" id="submitUpdate" value="Update">
            </form>
        </div>
    `
}

  module.exports = { 
      blogTemplate,
      newBlogTemplate,
      updateBlogTemplate
  }