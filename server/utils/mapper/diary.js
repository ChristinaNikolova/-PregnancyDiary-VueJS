const { weekListViewModel } = require("./week");

function diaryListViewModel(diary) {
  return {
    id: diary._id,
    title: diary.title,
    description: diary.description,
    positiveTestDate: diary.positiveTestDate,
    dueDate: diary.dueDate,
    gender: diary.gender,
  };
}

function diaryDetailsViewModel(diary) {
  return {
    id: diary._id,
    title: diary.title,
    description: diary.description,
    positiveTestDate: diary.positiveTestDate,
    dueDate: diary.dueDate,
    gender: diary.gender,
    isBabyBorn: diary.isBabyBorn,
    weeks: diary.weeks.map(weekListViewModel).sort((a, b) => a.title - b.title),
  };
}

module.exports = {
  diaryListViewModel,
  diaryDetailsViewModel,
};
