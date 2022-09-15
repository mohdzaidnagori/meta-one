import Link from "next/link"
import { AiOutlineClose } from "react-icons/ai"
import { motion } from "framer-motion";

const Newspace = () => {
  const dropIn = {
    hidden: {
      scale:0.7,
      opacity: 0,
    },
    visible: {
      scale:1,
      opacity: 1,
      transition: {
        default: {
          duration: 0.1,
          ease: [0, 0.71, 0.8, 1]
        },
        scale: {
          duration: 0.2, type: "tween"
        }
      },
    }
  };
  return (
    <motion.div
    className="space-modal"
    variants={dropIn}
    initial="hidden"
    animate="visible"
    >
        <Link href='/spaces'>
        <div className="space-modal-close"><AiOutlineClose /></div>
        </Link>
    </motion.div>
  )
}

export default Newspace
