import Image from 'next/image'
import Link from 'next/link'
import styles from './CardAbout.module.css'

const CardAbout = ({ blurb, name, image }) => {

  return (
    <>
    <div className={styles.imageContainer} >
       {/* <Link href={`/${name.toLowerCase()}`} >
         <a> */}
          <Image src={image} alt={name} layout="fill" objectFit='contain' />
          {/* </a>
       </Link> */}
      </div>
      <div className={styles.nameContainer}>
        <h2>{name}</h2>
      </div>
      <div className={styles.details}>
        <div className={styles.detailsTop}>
          <p>{blurb}</p> 
        </div>
      </div> 
    </>
  )
  }

export default CardAbout