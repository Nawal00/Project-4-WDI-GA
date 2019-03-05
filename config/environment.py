import os

db_uri = os.getenv('DATABASE_URL', 'postgres://localhost:5432/bee-social')
secret = os.getenv('SECRET', '&7V;jyJ#gJ/vyRAd')
city_mapper_key = os.getenv('CITY_MAPPER_KEY', '07c9508e8f2571ef2769b0ae20d547e0')
darksky_key = os.getenv('DARKSKY_KEY', '1459c01b9d6f1d2a74e09006b55d153c')
