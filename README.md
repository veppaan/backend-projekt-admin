**Vera Kippel veki2400**

Ett API byggt med express. 
API:et hanterar inloggningar för företaget Voff-Trucks personal

Tabellens namn heter "admin" som skapats med hjälp av SQLite3.
Tabellens innehåll:
- id INTEGER PRIMARY KEY AUTOINCREMENT
- firstname VARCHAR(50)
- lastname VARCHAR(50)
- jobtitle VARCHAR(50)
- username VARCHAR(255) NOT NULL UNIQUE
- password VARCHAR(255) NOT NULL
- created DATETIME DEFAULT CURRENT_TIMESTAMP


Användning:

|Metod | Ändpunkt | Beskrivning |
-------|----------|-------------|
|GET | "/" | Visar ett välkomstmeddelande|
|GET | "/admin/secret" | Skyddad route med token|
|POST| "/register" | Skapar en användare |
|POST | "/login" | Loggar in en användare|

Bokningens registrering i JSON-struktur kan se ut såhär:
```json
{
    "firstname": "Vera",
    "lastname": "Kippel",
    "jobtitle": "Chef",
    "username": "goodUsername",
    "password": "perfectPassword123"
}