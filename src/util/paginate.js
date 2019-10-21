import _ from "lodash";

export const paginate = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  //return items.slice(0 + (pageNumber -1) * pageSize, pageNumber * pageSize)
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
};
