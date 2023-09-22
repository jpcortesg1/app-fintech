FROM python:3.8.10

WORKDIR /app

COPY . /app

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD ["python", "src/main.py", "--host", "0.0.0.0"]