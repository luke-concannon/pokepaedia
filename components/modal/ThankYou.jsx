import { motion, AnimatePresence, animate } from 'framer-motion'
import styles from './ThankYou.module.css'
import ReactStars from 'react-rating-stars-component'

const ThankYou = ({ rating, comment, userName }) => {

  return (
    <AnimatePresence>
        <motion.div 
          className={styles.container}
          initial={{ translateY: 100 }}
          animate={{ translateY: 0, transition: {duration: 0.5 } }}
        >    
            <div className={styles.speechBubble}>
              <h4>{userName}</h4>
              <h3>{comment}</h3>
              <div className={styles.starsWrapper}>
              <ReactStars 
                size={20} 
                value={rating} 
                edit={false} 
                isHalf={true} 
                color="white"
              />
              </div>
            </div>
        </motion.div>
    </AnimatePresence>
  )
}
export default ThankYou