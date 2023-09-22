FROM python:3.8

WORKDIR /app

COPY ./src /app
COPY ./requirements.txt /app

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5006

CMD ["flask", "run", "--host", "0.0.0.0"]
