const images = document.querySelectorAll('.image-slider img');
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    let current = 0;

    function showImage(index) {
      images.forEach(img => img.classList.remove('active'));
      images[index].classList.add('active');
    }

    next.addEventListener('click', () => {
      current = (current + 1) % images.length;
      showImage(current);
    });

    prev.addEventListener('click', () => {
      current = (current - 1 + images.length) % images.length;
      showImage(current);
    });