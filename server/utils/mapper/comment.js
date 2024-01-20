const { formatCreatedAt } = require("../parser");

//todo update this model 
function commentViewModel(comment) {
  return {
    id: comment._id,
    content: comment.content,
    creatorId: comment.creator._id,
    //creatorName: getFullName(comment.creator),
    likesCount: comment.likes.length,
    likes: comment.likes,
    createdAt: formatCreatedAt(comment.createdAt),
  };
}

module.exports = {
  commentViewModel,
};
