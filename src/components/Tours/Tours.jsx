import { useEffect, useState } from 'react';
import TourCard from '../TourCard/TourCard';
import TourModal from '../TourModal/TourModal';

import './Tours.scss';

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch('index-tours.json')
      .then(response => response.json())
      .then(data => setTours(data.tours))
      .catch(error => console.error('Error fetching the tours data:', error));
  }, []);

  const handleSelectTour = (tour) => {
    setSelectedTour(tour);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTour(null);
  };

  return (
    <>
      <div className="tours__wrapper">
        {tours.map(tour => (
          <TourCard key={tour.id} tour={tour} onSelect={() => handleSelectTour(tour)} />
        ))}
      </div>
      {selectedTour && (
        <TourModal
          isOpen={isModalOpen}
          tourInfo={selectedTour}
          options={selectedTour.options}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default Tours;