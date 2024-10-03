const fs = require('fs');
const express = require("express");
const port = 3000;

const app = express();
const cars = JSON.parse(
    fs.readFileSync(`${__dirname}/assets/data/cars.json`, "utf-8")
);

// middleware untuk membaca json dari request body(client FE dll) ke kita
app.use(express.json());

app.get("/", (req,res) => {
    res.status(200).json({
        "status" : "Succes",
        "message" : "application is running good . . . ."
    });
});


app.get('/jet', (req, res) => {
    res.status(200).json({
        "message" : "Ping Succesfully"
    });
});

// api/v1/(collection type) => collection harus jamak (s)
app.get('/api/v1/cars', (req, res) => {
    // const cars = JSON.parse(
    //     fs.readFileSync(`${__dirname}/assets/data/cars.json`, "utf-8")
    // );

    // res.status(200).json({
    //     status: "Success",
    //     message: "Success get car data",
    //     isSuccess: true,
    //     data: cars,
    // });
    try{
        res.status(200).json({
            status: "Success",
            message: "Success get car data",
            isSuccess: true,
            totalData: cars.length,
            data: [cars],
        });
    }catch(error){
        res.status(404).json({
            status: "Failed",
            message: "Failed get car data",
            isSuccess: false,
            data: nul,
        })
    }
});

app.post('/api/v1/cars', (req, res) => {
    // insert into
    const newCar = req.body;
    
    cars.push(newCar);

    fs.writeFile(`${__dirname}/assets/data/cars.json`, JSON.stringify(cars), (err) => {
        res.status(201).json({
            status: "Success",
            message: "Success get car data",
            isSuccess: true,
            data: {
                cars: newCar
            },
        })
    });

    res.status(200).json({
        status: "Success",
        message: "Success get car data",
        isSuccess: true,
        data: {
            cars
        },
    });
});

// cara panggil respon.data.cars


// middleware / handler untuk url yang tidak dapat diakses karena memang tidak ada di aplikasi
// membuat middleware = our own middleware (.get .use)
app.use((req, res, next) => {
    // status code : 404 = untk not found (pengecekan data/url yang tidak ada)
    res.status(404).json({
        "status": "Failed",
        "massage": "API not exist !!!"
    })
});

app.listen("3000", () => {
    console.log("start apk dengan port 3000")
});
