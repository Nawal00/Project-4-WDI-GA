import os

db_uri = os.getenv('DATABASE_URL', 'postgres://localhost:5432/bee-social')
secret = os.getenv('SECRET', '&7V;jyJ#gJ/vyRAd')
city_mapper_key = os.getenv('CITY_MAPPER_KEY', '07c9508e8f2571ef2769b0ae20d547e0')
