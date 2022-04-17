import React, { useMemo } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getHeroById } from '../../selectors/getHeroById';

export const HeroScreen = () => {
  const {heroeId} = useParams();
  const navigate = useNavigate();

  const hero = useMemo(() => getHeroById(heroeId), [heroeId]);

  // const {id, superhero, publisher, alter_ego, first_appearance, characters} = hero;

  const handleReturn = () => {
    navigate(-1);
  }

  if (!hero) {
    return <Navigate to='/' />
  }

  const imagePath = `/assets/${hero.id}.jpg`;
  return (
    <div className='row mt-5'>
        <div className='col-4'>
          <img 
              src={imagePath}
              alt={hero.superhero}
              className="img-thumbnail animate__animated animate__fadeInLeft"
            />
        </div>

        <div className='col-8 animate__animated animate__fadeInUp'>
          <h3>{hero.superhero}</h3>
          <ul className='list-group'>
            <li className='list-group-item'><b>Alter ego: </b>{hero.alter_ego}</li>
            <li className='list-group-item'><b>Publisher: </b>{hero.publisher}</li>
            <li className='list-group-item'><b>First Appearance: </b>{hero.first_appearance}</li>
          </ul>

          <h5 className='mt-5'>Characters</h5>
          <p>{ hero.characters }</p>

          <button
            className='btn btn-outline-info'
            onClick={handleReturn}
          >Regresar</button>
        </div>
    </div>
  )
}
