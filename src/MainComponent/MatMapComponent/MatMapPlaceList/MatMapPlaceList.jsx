import { Link } from 'react-router-dom';
import MatMapPlaceListStyle from './MatMapPlaceList.module.css';

function MatMapPlaceList({ markers }) {
  return (
    <div>
      {markers.length > 0 ? (
        <ul>
          {markers.map((place, idx) => (
            <div key={idx}>
              <div>
                <Link
                  to={`/place/${place.id}`}
                  state={{ data: place }}
                  className={MatMapPlaceListStyle.link}
                >
                  <h2>{place.name}</h2>
                  <div>{place.category_group}</div>
                  <div>{place.category}</div>
                  <div>{place.road_address}</div>
                  <div>{place.address}</div>
                  <div>{place.phone}</div>
                </Link>
              </div>
            </div>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default MatMapPlaceList;
