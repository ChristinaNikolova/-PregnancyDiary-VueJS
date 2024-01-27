// todo const { formatCreatedAt } = require("../parser");

function diaryListViewModel(diary) {
  return {
    id: diary._id,
    title: diary.title,
    description: diary.description,
    dueDate: diary.dueDate,
    gender: diary.gender,
  };
}

module.exports = {
  diaryListViewModel,
};
