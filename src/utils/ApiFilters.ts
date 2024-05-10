class ApiFilters {
  query: any;
  queryString: any;

  constructor(query: any, queryString: any) {
    this.query = query;
    this.queryString = queryString;
  }

  Search() {
    const keyword = this.queryString.get("keyword")
      ? {
          name: {
            $regex: this.queryString.get("keyword"),
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const urlParams = new URLSearchParams(this.queryString);
    const queryCopy = {};
    for (const [key, value] of urlParams.entries()) {
      queryCopy[key] = value;
    }

    const removeFeilds = ["keyword", "page"];
    removeFeilds.forEach((el) => delete queryCopy[el]);

    let output = {};
    let prop = "";
    for (let key in queryCopy) {
      if (!key.match(/\b(gt|gte|lt|lte)/)) {
        output[key] = queryCopy[key];
      } else {
        prop = key.split("[")[0];

        let operator = key.match(/\[(.*)\]/)[1];

        if (!output[prop]) {
          output[prop] = {};
        }
        output[prop][`$${operator}`] = queryCopy[key];
      }
    }

    this.query = this.query.find(output);
    return this;
  }
  paginations(resPerPage) {
    const currentPage = Number(this.queryString.get("page")) || 1;
    const skip = resPerPage * (currentPage - 1);
    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

export default ApiFilters;
