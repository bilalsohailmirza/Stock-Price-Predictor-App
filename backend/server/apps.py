from django.apps import AppConfig

class ServerConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'server'
    def ready(self) -> None:
        from .logics import load_model, load_scaler
        load_model()
        print("Loaded LSTM Regressor model")
        load_scaler()
        print("Loaded MinMax Scaler for LSTM model")
        return super().ready()
