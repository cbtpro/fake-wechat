FROM centos:7
# 安装依赖环境
RUN yum install -y gcc gcc-c++ make \
    openssl-devel pcre-devel gd-devel \
    iproute net-tools telnet wget curl && \
    yum clean all && \
    rm -rf /var/cache/yum/*
RUN wget https://nginx.org/download/nginx-1.24.0.tar.gz && \
    tar zxf nginx-1.24.0.tar.gz && \
    cd nginx-1.24.0 && \
    # 指定nginx安装目录
    ./configure --prefix=/usr/local/nginx \
    --with-http_ssl_module \
    --with-http_stub_status_module && \
    make -j 4 && make install && \
    #rm -rf /usr/local/nginx/html/index.htm* && \
    # echo "ok" >> /usr/local/nginx/html/status.html && \
    cd / && rm -rf nginx-1.24.0* && \
    ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

ENV PATH $PATH:/usr/local/nginx/sbin
#COPY nginx/conf/. /usr/local/nginx/conf/
COPY dist/. /usr/local/nginx/html/
WORKDIR /usr/local/nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
