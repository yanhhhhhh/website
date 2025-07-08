import { Icon } from '../icons';
import { HTMLAttributes } from 'react';

interface AntdArrowProps {
  currentSlide?: number;
  slideCount?: number;
}

interface ArrowProps {
  direction: 'prev' | 'next';

  iconStyle?: HTMLAttributes<SVGElement>;
}
export const CarouselArrow = ({
  currentSlide,
  direction,
  slideCount,
  iconStyle,
  ...carouselProps
}: ArrowProps & AntdArrowProps) => {
  const style = {
    width: '0.46rem',
    height: '0.46rem',
    ...iconStyle,
  };

  return (
    <div>
      <Icon
        name="arrow-left"
        {...carouselProps}
        style={{
          ...style,
          transform:
            direction === 'next'
              ? 'translateY(-50%) rotate(180deg)'
              : 'undefined',
        }}
      />
    </div>
  );
};
