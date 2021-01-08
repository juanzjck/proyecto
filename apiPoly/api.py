from shapely.geometry import Point, Polygon, LineString, MultiLineString
from flask import Flask, escape, request

app = Flask(__name__)

# Create Point objects
p1 = Point(24.952242, 60.1696017)
p2 = Point(24.976567, 60.1612500)

# Create a Polygon
coords = [(24.950899, 60.169158), (24.953492, 60.169158), (24.953510, 60.170104), (24.950958, 60.169990)]
poly = Polygon(coords)

print(p1.within(poly))
print(p2.within(poly))

line_a = LineString([(-0.166097,-78.468605), (-0.171326,-78.470766)])
line_b = LineString([(-0.170894,-78.475830), (-0.169309,-78.476118)])

print(line_a.intersects(line_b))




@app.route('/',methods=['POST','GET'])
def api():
    flag='False'
    if request.method == 'POST':
        data=request.json
      #  coords = [(-0.166097,-78.468605), (-0.171326,-78.470766), (-0.170894,-78.475830), (-0.169309,-78.476118)]
        print('===========resultados===========')
        print(data['poligonos'])
        poly =  BuildPoly(data['poligonos'])



        p=[]
        for i in range(len(data['puntos'])):
            point=data['puntos'][i].split(',')
            lat=point[0]
            lan=point[1]

            p.append(Point(float(lat), float(lan)))

           # print('lat='+lat+'lan='+lan)
        for i in range(len(p)):
          if p[i].within(poly):
            flag='True'
            print(p[i].within(poly))
    return flag

def BuildPoly(polygons):
    cords=[]
    for i in range(len(polygons)):
        point = polygons[i].split(',')
        lat = point[0]
        lan = point[1]
        cords.append((float(lat), float(lan)))
    print(cords)
    poly = Polygon(cords)


    return  poly



app.run(host='0.0.0.0',port='5000')