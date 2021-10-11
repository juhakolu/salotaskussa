//Pääkomponentti Kokous ja juhla sivulle
import React, {useState, useEffect} from 'react';
import MapBox from '../mappage/map.component';
import RightSideValikko from '../../components/rightsidevalikko/rightsidevalikko.component';
import Dexie from 'dexie';
import {useSwipeable} from 'react-swipeable';

const KokousJaJuhlaPage = ({map}) => {
  const db = new Dexie("switchdata");
  db.version(1).stores({
      dontshow: "++id, name"
  })

  /* eslint-disable no-return-await */
  const addItemToDb = async (id) => {
    await db.dontshow.add({
      name: id
    });
    }

  const removeItemFromDb = async (id) => {
    await db.dontshow.where("name").equals(id).delete();
  }

  const getItemfromDb = async(id) => {
    var val = false;
    await db.dontshow.each(function(item){
        if (item.name == id)
        {val = true;}
    });
    return val;
  }

  const [isRightValikko, setIsRightValikko] = useState(false);
  const handleChangeValikko = () => setIsRightValikko(!isRightValikko);

  const [switchdata, setSwitchdata] = useState(
  		[
        {
          name: "Kokous- ja juhlapalvelut",
          places : [
            {title: "Catering", show: true},
            {title: "Kokous-, juhla- ja tapahtumatilat", show: true},
            // {title: "Kuljetuspalvelut", show: true},
            {title: "Ohjelmapalvelut", show: true},
            {title: "Saunapalvelut", show: true},
          ]
        }
  		]
  	);

    const [showAll, setShowAll] = useState(true);

    const handleAll = () => {
    if(!showAll){
      for(let item of switchdata){
        for(let place of item.places){
          place.show = true;
          removeItemFromDb(place.title);
        }
      }
    setSwitchdata([...switchdata])
    setShowAll(true)
    }else{
      for(let item of switchdata){
        for(let place of item.places){
          place.show = false;
          addItemToDb(place.title);
        }
      }
    setSwitchdata([...switchdata])
    setShowAll(false)
    }
  }


    const handlers = useSwipeable({
      onSwipedLeft: (e) => {
        if(!isRightValikko && e.initial[0] > window.innerWidth - 25){
          setIsRightValikko(true);
        }
      },
      onSwipedRight: (e) => {
        if(isRightValikko){
          setIsRightValikko(false);
        }
      },
    });

    const handleChange = (id) => {
      for(let item of switchdata){
        for(let second of item.places){
          if(second.title === id){
            console.log(`${second.title} toggled to ${!second.show}`);
            second.show = !second.show;
            if (second.show)
            {removeItemFromDb(id);}
            else {
              addItemToDb(id);
            }
            setSwitchdata([...switchdata]);
          }
        }
      }
    }
const startChange = async(id) => {
    for(let item of switchdata){
      for(let second of item.places){
        if(await getItemfromDb(second.title)){
          console.log(`${second.title} toggled to ${!second.show}`);
          second.show = false;
          setSwitchdata([...switchdata]);
        }
      }
    }
}
  useEffect(() => {
    startChange();
  }, []);
  return (
    <>
      <div {...handlers}>
        <MapBox switchdata={switchdata} map = {map}/>
        <RightSideValikko isAll={showAll} handleAll={handleAll} handleChangeValikko={handleChangeValikko} isValikko={isRightValikko} toggleBtn={(id) => handleChange(id)} data={switchdata} valikkoWidth={260} textWidth={160} float="left" titleLeftMargin={0}/>
      </div>
    </>
  )
};

export default KokousJaJuhlaPage;
