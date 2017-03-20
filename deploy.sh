# !/bin/sh

# 使用 Angular CLI 部署项目
echo 正在编译项目...
ng build --prod -aot

# 优化图片
echo 正在优化项目中的图片...
cd dist/assets/images
open -a ImageOptim .

# 压缩代码文件的大小
echo 正在压缩代码文件...
cd ../..
for file in ./*
do
  if [[ $file == *.js ]]
  then
    # 压缩 js 文件
    echo 压缩 $file
    uglifyjs $file --screw-ie8 --compress --mangle --output $file
  fi
  if [[ $file == *.css ]]
  then
    # 压缩 css 文件
    echo 压缩 $file
    uglifycss $file > $file
  fi
  if [[ $file == *.html ]]
  then
    # 压缩 html 文件
    echo 压缩 $file
    html-minifier --input-dir $file --output-dir $file
  fi
done

echo 项目部署成功！
