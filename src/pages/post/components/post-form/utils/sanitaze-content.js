export const sanitazeContent = (content) =>
  content
    .replaceAll("<div><br></div>", "\n")
    .replaceAll("<div>", "\n")
    .replace("/ + /", " ")
    .replaceAll("</div>", "");
