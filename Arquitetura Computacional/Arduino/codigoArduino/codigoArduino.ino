//Usando 2 sensores LM35(Temperatura)
#include "DHT.h"
#define dht_type DHT11 //define qual o tipo de sensor DHTxx que se está utilizando
const int LM35 = A4; //Define o pino que irá ler a saida do LM35
float temperatura; //Variável que ira armazenar a temperatura medida
int dht_pin = A1;
DHT dht_1 = DHT(dht_pin, dht_type); //pode-se configurar diversos sensores DHTxx

//Função que será executada uma vez quando ligar ou resetar o Arduino
void setup(){
  Serial.begin(9600); //Inicializa a comunicação serial
  dht_1.begin();
}

//Função que será executada continuamente
void loop(){
  float umidade = dht_1.readHumidity()+2;
  temperatura = (float(analogRead(LM35))*5/((1023))/0.01)-12;
  float umidade2 = dht_1.readHumidity()+10;
  float temperatura2 = (float(analogRead(LM35))*5/((1023))/0.01)-10;
  
  if(isnan(umidade)){
    Serial.println("Erro ao ler o DHT");
  } else{
    Serial.print(umidade);
    Serial.print(",");
    Serial.print(temperatura);
    Serial.print(",");
    Serial.print(umidade2);
    Serial.print(",");
    Serial.println(temperatura2);
  
  //   Serial.print("Umidade: ");
  //   Serial.print(",");
  //   Serial.print("Temperatura: ");
  //   Serial.println(temperatura2);
  //   Serial.print(" °C");
  // }
    delay(1000);
  }};