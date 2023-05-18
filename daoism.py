# 打开文本文件
with open("text.txt", "r", encoding="utf-8") as f:
  # 读取文言文
  text = f.read()
# 定义白话文文本
#text = "可以说的道路，不是永恒的道路。可以叫的名字，不是永恒的名字。没有名字，是万物的起源；有了名字，是万物的母亲。所以常常不想要什么，就能看到它的奥妙；常常想要什么，就能看到它的边界。这两者，同样出自一个源头，但是有不同的名字，都叫做玄。玄之又玄，是万物奇妙的门。"

# 定义道家类
class Daoism:
  # 初始化方法
  def __init__(self, name, origin, principle):
    self.name = name # 名称
    self.origin = origin # 起源
    self.principle = principle # 原理

  # 定义显示方法
  def show(self):
    print(f"这是{self.name}的介绍：")
    print(f"起源于{self.origin}。")
    print(f"原理是{self.principle}。")

# 创建道家对象
daoism = Daoism("道家", "老子", text)

# 调用显示方法
daoism.show()

# 导入可视化库
import matplotlib.pyplot as plt

# 定义可视化函数
def visualize(daoism):
  # 创建图形
  fig, ax = plt.subplots()
  # 设置标题
  ax.set_title(daoism.name)
  # 设置标签
  ax.set_xlabel("概念")
  ax.set_ylabel("频率")
  # 统计原理中的关键词频率
  words = daoism.principle.split("，")
  freqs = {}
  for word in words:
    freqs[word] = freqs.get(word, 0) + 1
  # 绘制柱状图
  ax.bar(freqs.keys(), freqs.values())
  # 显示图形
  plt.show()

# 调用可视化函数
visualize(daoism)