export const extractField = (vCardData: any, field: any) => {
  const lines = vCardData.split("\n");
  for (let line of lines) {
    if (line.startsWith(field)) {
      return line.split(":")[1].trim();
    }
  }
  return null;
};

export const extractAllFields = (vCardData: any, field: any) => {
  const lines = vCardData.split("\n");
  const values = [];
  for (let line of lines) {
    if (line.startsWith(field)) {
      values.push(line.split(":")[1].trim());
    }
  }
  return values;
};
