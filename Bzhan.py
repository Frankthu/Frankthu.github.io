# 导入requests库和json库
import requests
import json

# 定义目标网址和评论接口
url = "https://www.bilibili.com/video/BV1qs4y1Q7Hc?vd_source=de91214e8ca83048b5eb0dfe5626a4d8"
comment_api = "https://api.bilibili.com/x/v2/reply?pn={}&type=1&oid=411721933&sort=2"

# 定义一个空列表用来存储评论数据
comments = []

# 定义一个循环，从第一页开始爬取评论，直到没有下一页为止
page = 1
while True:
    # 拼接评论接口和页码参数
    comment_url = comment_api.format(page)
    # 发送请求，获取响应
    response = requests.get(comment_url)
    # 解析响应为json格式
    data = response.json()
    # 判断是否有数据，如果没有，跳出循环
    if not data["data"]["replies"]:
        break
    # 遍历每条评论，提取评论内容和点赞数，并添加到列表中
    for reply in data["data"]["replies"]:
        comment = reply["content"]["message"]
        like = reply["like"]
        comments.append({"comment": comment, "like": like})
    # 打印当前页码和评论数
    print(f"正在爬取第{page}页，共{len(comments)}条评论")
    # 递增页码
    page += 1

# 定义一个json文件名
json_file = "bilibili_comments.json"
# 打开文件，写入评论数据
with open(json_file, "w", encoding="utf-8") as f:
    json.dump(comments, f, ensure_ascii=False, indent=4)
# 打印完成提示
print(f"爬取完成，共{len(comments)}条评论，已保存到{json_file}")
