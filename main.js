fetch('./data.json')
    .then(response => response.json())
    .then(data => mainFunction(data));

function mainFunction(data) {
    const comm = data.comments;
    const commentList = document.getElementById('comm-list');
    const replyList = document.getElementById('reply-list');

    var options = ``;
    var youSpan = '';

    function check(current, writer, comId) {
        if (current == writer){
            options = `<div class="button-wrapper">

            <div class="trash-button">
              <i class="fas fa-trash"></i>
              <span class="trash" onclick="deleteComment('com${comId}')">Delete</span>
             </div>
             <div class="edit-button">
               <i class="fas fa-edit"></i>
               <span class="edit" onclick="editComment(${comId})">Edit</span>
             </div>
 
           </div>` ;

           youSpan = ' <span class="you">you</span>';
        } else {
            options = `<div class="reply-button">
            <i class="fas fa-reply"></i>
            <span class="reply" onclick="showReplyBox('${writer}','${data.currentUser.image.png}', 'com${comId}')">Reply</span>
          </div>` ;
           youSpan = '';
        }
    }

    // comments
    comm.forEach(element => {
        check(data.currentUser.username, element.user.username, element.id);

        commentList.insertAdjacentHTML('afterbegin',
        
        `
        <div class="comment-wrapper" id="com${element.id}">
         <div class="profile-wrapper">
          <div class="profile-img">
            <img src="${element.user.image.png}" alt="">
          </div>
          <h1 class="name">${element.user.username}</h1>
          ${youSpan}
          <p class="post-time">${element.createdAt}</p>
         </div>
         <div id="pcom${element.id}" class="comment-paragraph">
           <p >
           ${element.content}
           </p>
         </div>

         <textarea class="editbox" id="editbox${element.id}" style="display:none;"></textarea>
         <div><button class="submit update"  id="up${element.id}" onclick="updateComment('${element.id}')">UPDATE</button></div>

         <div class="footer-comment-section">
           <div class="counter-wrapper">
             <i class="fas fa-plus"></i>
             <span class="upvote">${element.score}</span>
             <i class="fas fa-minus"></i>
           </div>

           ${options}
           
         </div>
       </div>
       ` )

       if(element.replies.length > 0) {
           element.replies.forEach(reply => {
               check(data.currentUser.username, reply.user.username, reply.id)
               replyList.insertAdjacentHTML('afterbegin', 
               `
               <div class="comment-wrapper" id="com${reply.id}">
                <div class="profile-wrapper">
                <div class="profile-img">
                <img src="${reply.user.image.png}" alt="">
                </div>
                <h1 class="name">${reply.user.username}</h1>
                ${youSpan}
                
                <p class="post-time">${reply.createdAt}</p>
                </div>
                <div class="comment-paragraph" id="pcom${reply.id}">
                <p>
                <span class="user-name">@maxblagun</span> ${reply.content}
                </p>
                </div>

                <textarea class="editbox" id="editbox${reply.id}" style="display:none;"></textarea>
                <div class="updatediv"><button class="submit update"  id="up${reply.id}" onclick="updateComment('${reply.id}')">UPDATE</button></div>

                <div class="footer-comment-section">
                <div class="counter-wrapper">
                    <i class="fas fa-plus"></i>
                    <span class="upvote"></span>
                    <i class="fas fa-minus"></i>
                </div>
                ${options}
                </div>
            </div>

               `)
           })
       }
    });

    const currentUser = data.currentUser;
    const addCommentContainer = document.getElementById('addcontainer');
    addCommentContainer.insertAdjacentHTML('afterbegin', 
     `
     <img src="${currentUser.image.png}" alt="">

     `
    )
}