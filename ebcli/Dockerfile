FROM python:3

RUN pip install --upgrade pip && pip install awsebcli

WORKDIR /server

CMD ["eb", "deploy"]
