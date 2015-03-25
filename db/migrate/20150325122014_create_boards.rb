class CreateBoards < ActiveRecord::Migration
  def change
    create_table :boards do |t|
      t.string :grid
      t.timestamps null: false
    end
  end
end
