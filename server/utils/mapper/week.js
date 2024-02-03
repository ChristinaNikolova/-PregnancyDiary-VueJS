function weekListViewModel(week) {
  return {
    id: week._id,
    title: week.title,
    subTitle: week.subTitle,
    trimester: week.trimester,
  };
}

function weekDetailsViewModel(week) {
  return {
    id: week._id,
    title: week.title,
    subTitle: week.subTitle,
    trimester: week.trimester,
    text: week.text,
    myWeight: week.myWeight,
    myBellySize: week.myBellySize,
    babyWeight: week.babyWeight,
    babyHeight: week.babyHeight,
    mood: week.mood,
  };
}

module.exports = {
  weekListViewModel,
  weekDetailsViewModel,
};
