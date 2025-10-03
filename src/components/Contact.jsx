/* Contact page */
import './Contact.css'
import Swal from 'sweetalert2'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        formData.append("access_key", "eb697724-19ee-45d6-8837-1b7de5c51c39");

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: json
        }).then((res) => res.json());

        if (res.success) {
            Swal.fire({
                title: "Message Sent!",
                text: "We'll get back to you shortly!",
                icon: "success"
            });

            event.target.reset();
        }
    };

    return (
        <section className="contact" style={{ backgroundColor: '#BF5700' }}>
            {/* Social Media Icons */}
            <div className="social-media" style={{
                marginBottom: '2rem',
                display: 'flex',
                justifyContent: 'center',
                gap: '2rem',
                paddingTop: '2rem'
            }}>
                <a 
                    href="https://www.linkedin.com/company/lhneurotech/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: '#FFF8D6', fontSize: '2rem' }}
                >
                    <FaLinkedin className="social-icon" />
                </a>
                <a 
                    href="https://www.instagram.com/lhneurotech/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: '#FFF8D6', fontSize: '2rem' }}
                >
                    <FaInstagram className="social-icon" />
                </a>
            </div>

            <form onSubmit={onSubmit} style={{ backgroundColor: 'white', borderRadius: '10px' }}>
                <h2>Contact Us</h2>
                <div className="input-box">
                    <label>Full Name</label>
                    <input type="text" className="field" placeholder='Enter your name' name='name' required />
                </div>
                <div className="input-box">
                    <label>Email Address</label>
                    <input type="text" className="field" placeholder='Enter your email' name='email' required />
                </div>
                <div className="input-box">
                    <label>Your Message</label>
                    <textarea name="message" className="field mess" placeholder="Enter your message" required></textarea>
                </div>
                <button type="submit">Send Message</button>
            </form>
        </section>
    );
};

export default Contact;