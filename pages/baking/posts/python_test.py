import markdown

with open("C:\\jacob\\websites\\jacob\\pages\\baking\\posts\\sandwich_bread_v1.md", "r", encoding="utf-8") as input_file:
    text = input_file.read()
html = markdown.markdown(text,extensions=['tables'])

markdown.markdownFromFile(input="C:\\jacob\\websites\\jacob\\pages\\baking\\posts\\sandwich_bread_current.md", output="C:\\jacob\\websites\\jacob\\pages\\baking\\posts\\sandwich_bread_current.html")