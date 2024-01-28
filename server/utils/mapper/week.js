function weekListViewModel(week) {
  return {
    id: week._id,
    title: week.title,
    subTitle: week.subTitle,
    text: week.text,
    trimester: week.trimester,
  };
}

module.exports = {
  weekListViewModel,
};
